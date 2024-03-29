// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// For OpenSea integration
abstract contract OwnableDelegateProxy {

}

/**
 * Used to delegate ownership of a contract to another address,
 * to save on unneeded transactions to approve contract use for users
 */
abstract contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}
