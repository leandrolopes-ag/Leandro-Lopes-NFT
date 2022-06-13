// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// OpenSea proxy registry mock
contract ProxyRegistryMock {
    mapping(address => address) public proxies;

    /**
        Set proxy address on deploy for easy testing
        @param _owner NFT owner
        @param _operator NFT approved-for-all user
     */
    constructor(address _owner, address _operator) {
        proxies[_owner] = _operator;
    }

    /**
        Add additional pairs as needed
        @param _owner NFT owner
        @param _operator NFT approved-for-all user
     */
    function setProxy(address _owner, address _operator) external {
        proxies[_owner] = _operator;
    }
}
