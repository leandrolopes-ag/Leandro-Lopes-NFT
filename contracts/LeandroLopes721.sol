// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import "./ERC721.sol";
import "./ERC721Enumerable.sol";
import "./ERC721Burnable.sol";
import "./AccessControl.sol";
import "./OpenSeaIntegration.sol";

// ERC721 token for Leandro Lopes
contract LeandroLopes721 is
    ERC721,
    ERC721Enumerable,
    ERC721Burnable,
    AccessControl
{
    /// minter role hash
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// address of OpenSea proxy registry contract
    address public immutable proxyRegistryAddress;

    // base URI for token json files
    string internal _baseUri;

    /**
        Contract constructor
        @param _name token name
        @param _symbol token symbol
        @param _uri default base token URI
        @param _openseaProxy addres of OpenSea proxy on given network
     */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        address _openseaProxy
    ) ERC721(_name, _symbol) {
        proxyRegistryAddress = _openseaProxy;
        _baseUri = _uri;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    /**
        Mint new NFT token, only for contract Owner
        @param to address of NFT owner
        @param tokenId unique token indetificator
     */
    function safeMint(address to, uint256 tokenId)
        public
        onlyRole(MINTER_ROLE)
    {
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
        Override for OpenSea integration
     */
    function isApprovedForAll(address owner, address operator)
        public
        view
        override(ERC721, IERC721)
        returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return ERC721.isApprovedForAll(owner, operator);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseUri;
    }

    function baseTokenURI() public view returns (string memory) {
        return _baseURI();
    }

    /**
        Update base token URI if needed
        @param _newUri new base token URI
     */
    function updateBaseUri(string memory _newUri)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _baseUri = _newUri;
    }
}
