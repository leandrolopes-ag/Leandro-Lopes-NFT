const { accounts, contract } = require('@openzeppelin/test-environment');
const {
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;
const { expect } = require('chai');

const LLtoken = contract.fromArtifact("LeandroLopes721")
const OSproxy = contract.fromArtifact("ProxyRegistryMock")

describe("NFT721 token test", function () {

    let token, proxy;

    let [owner, user1, user2, user3, openSea] = accounts;

    beforeEach(async function () {
        proxy = await OSproxy.new(user3, openSea); //user3 approves openSea
        token = await LLtoken.new("name", "sybol", "http://base.token.uri/", proxy.address, { from: owner });
    })

    describe('safeMint:', function () {
        it('mint token', async function () {
            let resp = await token.safeMint(user1, '1234567', { from: owner });
            expectEvent(resp, "Transfer", { from: ZERO_ADDRESS, to: user1, tokenId: '1234567' })
            expect(await token.ownerOf('1234567') == user1, 'wrong owner');
        })
        it('throws when try mint same token', async function () {
            await token.safeMint(user1, '1234567', { from: owner });
            await expectRevert(token.safeMint(user1, '1234567', { from: owner }),
                "ERC721: token already minted")
        })
        it('throws when not-owner mints', async function () {
            // unspecified because addresses are changing
            // AccessControl: account 0x... is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6
            await expectRevert.unspecified(token.safeMint(user1, '1234567', { from: user2 }))
        })
    })

    describe('Burn tokens:', function () {
        it('throws when not from owner', async function () {
            await token.safeMint(user1, '1234567', { from: owner });
            await expectRevert(token.burn('1234567', { from: user2 }),
                "ERC721Burnable: caller is not owner nor approved")
        })
        it('burns from owner', async function () {
            await token.safeMint(user1, '1234567', { from: owner });
            resp = await token.burn('1234567', { from: user1 })
            expectEvent(resp, "Transfer", { from: user1, to: ZERO_ADDRESS, tokenId: '1234567' })
        })
    })

    describe('Transfer checks', function () {
        it('transfer token', async function () {
            await token.safeMint(user2, '123', { from: owner })
            const ret = await token.safeTransferFrom(user2, user1, '123', { from: user2 })
            expectEvent(ret, 'Transfer',
                { from: user2, to: user1, tokenId: '123' })
            // try transfer not-owned token
            await expectRevert(token.safeTransferFrom(user2, user1, '123', { from: user2 }),
                "ERC721: transfer caller is not owner nor approved")
            // try transfer non-existing token
            await expectRevert(token.safeTransferFrom(user2, user1, '1234', { from: user2 }),
                "ERC721: operator query for nonexistent token")
        })
        it('transfer when approved for all', async function () {
            await token.safeMint(user3, '111', { from: owner })
            await token.setApprovalForAll(user2, true, { from: user3 })
            expect(await token.isApprovedForAll(user3, user2)).to.be.true;
            const ret = await token.safeTransferFrom(user3, user1, '111', { from: user2 })
            expectEvent(ret, 'Transfer',
                { from: user3, to: user1, tokenId: '111' })
        })
        it('transfer as opensea proxy', async function () {
            // user3 is set on openseaproxy mock deploy
            await token.safeMint(user3, '111', { from: owner })
            const ret = await token.safeTransferFrom(user3, user1, '111', { from: openSea })
            expectEvent(ret, 'Transfer',
                { from: user3, to: user1, tokenId: '111' })
        })
    })

    describe('Operator checks', function () {
        it('set approval to all', async function () {
            expect(await token.isApprovedForAll(user1, user2)).to.be.false;
            // set approval
            ret = await token.setApprovalForAll(user2, true, { from: user1 })
            expectEvent(ret, "ApprovalForAll",
                { owner: user1, operator: user2, approved: true })
            expect(await token.isApprovedForAll(user1, user2)).to.be.true;
            // remove approval 
            ret = await token.setApprovalForAll(user2, false, { from: user1 })
            expectEvent(ret, "ApprovalForAll",
                { owner: user1, operator: user2, approved: false })
            expect(await token.isApprovedForAll(user1, user2)).to.be.false;
        })

    })

    describe('Readers', async function () {
        it('show proper tokenURI', async function () {
            const uri = await token.baseTokenURI();
            await token.safeMint(user1, '12121', { from: owner })
            expect(await token.tokenURI('12121')).to.eq(uri + '12121' + '.json')
        })
        it('change base uri', async function () {
            const uri = await token.baseTokenURI();
            await token.safeMint(user1, '111', { from: owner })
            expect(await token.tokenURI('111')).to.eq(uri + '111' + '.json')
            const newUri = "ipfs://thereYouGo/storage/"
            await token.updateBaseUri(newUri, { from: owner })
            expect(await token.tokenURI('111')).to.eq(newUri + '111' + '.json')
        })
    })

    describe('Roles', async function () {
        it('minter role checks', async function () {
            const minterRoleHex = await token.MINTER_ROLE()
            expectEvent(await token.grantRole(minterRoleHex, user1, { from: owner }),
                "RoleGranted",
                {
                    role: minterRoleHex,
                    account: user1,
                    sender: owner
                }
            )
            await token.safeMint(user2, '123', { from: user1 })
            expect(await token.balanceOf(user2)).to.be.bignumber.eq('1')
        })
        it('owner role checks', async function () {
            // add second admin
            const adminRoleHex = await token.DEFAULT_ADMIN_ROLE()
            // set user1 as additional admin
            let ret = await token.grantRole(adminRoleHex, user1, { from: owner });
            expectEvent(ret, "RoleGranted", {
                role: adminRoleHex,
                account: user1,
                sender: owner
            })
            // remove original owner
            ret = await token.revokeRole(adminRoleHex, owner, { from: user1 })
            expectEvent(ret, "RoleRevoked", {
                role: adminRoleHex,
                account: owner,
                sender: user1
            })
            // renounce admin role (no more changes in roles from this point)
            ret = await token.renounceRole(adminRoleHex, user1, { from: user1 })
            expectEvent(ret, "RoleRevoked", {
                role: adminRoleHex,
                account: user1,
                sender: user1
            })
        })
    })
})

