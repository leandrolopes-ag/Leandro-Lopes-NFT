# Summary

- [unused-return](#unused-return) (1 results) (Medium)
- [variable-scope](#variable-scope) (3 results) (Low)
- [assembly](#assembly) (2 results) (Informational)
- [pragma](#pragma) (1 results) (Informational)
- [dead-code](#dead-code) (14 results) (Informational)
- [solc-version](#solc-version) (14 results) (Informational)
- [low-level-calls](#low-level-calls) (4 results) (Informational)
- [naming-convention](#naming-convention) (3 results) (Informational)

## unused-return

Impact: Medium
Confidence: Medium

- [ ] ID-0
[ERC721._checkOnERC721Received(address,address,uint256,bytes)](contracts/base/ERC721.sol#L466-L496) ignores return value by [IERC721Receiver(to).onERC721Received(msg.sender,from,tokenId,_data)](contracts/base/ERC721.sol#L473-L492)

contracts/base/ERC721.sol#L466-L496

## variable-scope

Impact: Low
Confidence: High

- [ ] ID-1
Variable '[ERC721._checkOnERC721Received(address,address,uint256,bytes).reason](contracts/base/ERC721.sol#L482)' in [ERC721._checkOnERC721Received(address,address,uint256,bytes)](contracts/base/ERC721.sol#L466-L496) potentially used before declaration: [revert(uint256,uint256)(32 + reason,mload(uint256)(reason))](contracts/base/ERC721.sol#L489)

contracts/base/ERC721.sol#L482

- [ ] ID-2
Variable '[ERC721._checkOnERC721Received(address,address,uint256,bytes).reason](contracts/base/ERC721.sol#L482)' in [ERC721._checkOnERC721Received(address,address,uint256,bytes)](contracts/base/ERC721.sol#L466-L496) potentially used before declaration: [reason.length == 0](contracts/base/ERC721.sol#L483)

contracts/base/ERC721.sol#L482

- [ ] ID-3
Variable '[ERC721._checkOnERC721Received(address,address,uint256,bytes).retval](contracts/base/ERC721.sol#L480)' in [ERC721._checkOnERC721Received(address,address,uint256,bytes)](contracts/base/ERC721.sol#L466-L496) potentially used before declaration: [retval == IERC721Receiver.onERC721Received.selector](contracts/base/ERC721.sol#L481)

contracts/base/ERC721.sol#L480

## assembly

Impact: Informational
Confidence: High

- [ ] ID-4
[Address.verifyCallResult(bool,bytes,string)](contracts/libraries/Address.sol#L240-L260) uses assembly
  - [INLINE ASM](contracts/libraries/Address.sol#L252-L255)

contracts/libraries/Address.sol#L240-L260

- [ ] ID-5
[ERC721._checkOnERC721Received(address,address,uint256,bytes)](contracts/base/ERC721.sol#L466-L496) uses assembly
  - [INLINE ASM](contracts/base/ERC721.sol#L488-L490)

contracts/base/ERC721.sol#L466-L496

## pragma

Impact: Informational
Confidence: High

- [ ] ID-6
Different versions of Solidity are used:
  - Version used: ['=0.8.16', '^0.8.0', '^0.8.1']
  - [=0.8.16](contracts/LeandroLopes721.sol#L3)
  - [^0.8.0](contracts/OpenSeaIntegration.sol#L3)
  - [^0.8.0](contracts/base/AccessControl.sol#L6)
  - [^0.8.0](contracts/base/ERC165.sol#L6)
  - [^0.8.0](contracts/base/ERC721.sol#L6)
  - [^0.8.0](contracts/base/ERC721Burnable.sol#L6)
  - [^0.8.0](contracts/base/ERC721Enumerable.sol#L7)
  - [^0.8.0](contracts/interfaces/IAccessControl.sol#L7)
  - [^0.8.0](contracts/interfaces/IERC165.sol#L7)
  - [^0.8.0](contracts/interfaces/IERC721.sol#L7)
  - [^0.8.0](contracts/interfaces/IERC721Enumerable.sol#L7)
  - [^0.8.0](contracts/interfaces/IERC721Metadata.sol#L7)
  - [^0.8.0](contracts/interfaces/IERC721Receiver.sol#L7)
  - [^0.8.0](contracts/libraries/Strings.sol#L6)
  - [^0.8.1](contracts/libraries/Address.sol#L6)

contracts/LeandroLopes721.sol#L3

## dead-code

Impact: Informational
Confidence: Medium

- [ ] ID-7
[Address.verifyCallResult(bool,bytes,string)](contracts/libraries/Address.sol#L240-L260) is never used and should be removed

contracts/libraries/Address.sol#L240-L260

- [ ] ID-8
[AccessControl._setRoleAdmin(bytes32,bytes32)](contracts/base/AccessControl.sol#L243-L247) is never used and should be removed

contracts/base/AccessControl.sol#L243-L247

- [ ] ID-9
[Address.sendValue(address,uint256)](contracts/libraries/Address.sol#L62-L73) is never used and should be removed

contracts/libraries/Address.sol#L62-L73

- [ ] ID-10
[Address.functionCallWithValue(address,bytes,uint256)](contracts/libraries/Address.sol#L125-L137) is never used and should be removed

contracts/libraries/Address.sol#L125-L137

- [ ] ID-11
[Address.functionDelegateCall(address,bytes,string)](contracts/libraries/Address.sol#L223-L232) is never used and should be removed

contracts/libraries/Address.sol#L223-L232

- [ ] ID-12
[Strings.toHexString(uint256)](contracts/libraries/Strings.sol#L44-L55) is never used and should be removed

contracts/libraries/Strings.sol#L44-L55

- [ ] ID-13
[Address.functionDelegateCall(address,bytes)](contracts/libraries/Address.sol#L205-L215) is never used and should be removed

contracts/libraries/Address.sol#L205-L215

- [ ] ID-14
[Address.functionCallWithValue(address,bytes,uint256,string)](contracts/libraries/Address.sol#L145-L161) is never used and should be removed

contracts/libraries/Address.sol#L145-L161

- [ ] ID-15
[Address.functionStaticCall(address,bytes)](contracts/libraries/Address.sol#L169-L180) is never used and should be removed

contracts/libraries/Address.sol#L169-L180

- [ ] ID-16
[ERC721._baseURI()](contracts/base/ERC721.sol#L142-L144) is never used and should be removed

contracts/base/ERC721.sol#L142-L144

- [ ] ID-17
[AccessControl._setupRole(bytes32,address)](contracts/base/AccessControl.sol#L234-L236) is never used and should be removed

contracts/base/AccessControl.sol#L234-L236

- [ ] ID-18
[Address.functionCall(address,bytes,string)](contracts/libraries/Address.sol#L106-L112) is never used and should be removed

contracts/libraries/Address.sol#L106-L112

- [ ] ID-19
[Address.functionStaticCall(address,bytes,string)](contracts/libraries/Address.sol#L188-L197) is never used and should be removed

contracts/libraries/Address.sol#L188-L197

- [ ] ID-20
[Address.functionCall(address,bytes)](contracts/libraries/Address.sol#L93-L98) is never used and should be removed

contracts/libraries/Address.sol#L93-L98

## solc-version

Impact: Informational
Confidence: High

- [ ] ID-21
Pragma version[^0.8.0](contracts/base/ERC165.sol#L6) allows old versions

contracts/base/ERC165.sol#L6

- [ ] ID-22
Pragma version[^0.8.0](contracts/base/ERC721Burnable.sol#L6) allows old versions

contracts/base/ERC721Burnable.sol#L6

- [ ] ID-23
Pragma version[^0.8.0](contracts/base/AccessControl.sol#L6) allows old versions

contracts/base/AccessControl.sol#L6

- [ ] ID-24
Pragma version[^0.8.0](contracts/base/ERC721.sol#L6) allows old versions

contracts/base/ERC721.sol#L6

- [ ] ID-25
Pragma version[^0.8.0](contracts/libraries/Strings.sol#L6) allows old versions

contracts/libraries/Strings.sol#L6

- [ ] ID-26
Pragma version[^0.8.0](contracts/interfaces/IERC721Metadata.sol#L7) allows old versions

contracts/interfaces/IERC721Metadata.sol#L7

- [ ] ID-27
Pragma version[^0.8.1](contracts/libraries/Address.sol#L6) allows old versions

contracts/libraries/Address.sol#L6

- [ ] ID-28
Pragma version[^0.8.0](contracts/interfaces/IAccessControl.sol#L7) allows old versions

contracts/interfaces/IAccessControl.sol#L7

- [ ] ID-29
Pragma version[^0.8.0](contracts/interfaces/IERC721Enumerable.sol#L7) allows old versions

contracts/interfaces/IERC721Enumerable.sol#L7

- [ ] ID-30
Pragma version[^0.8.0](contracts/base/ERC721Enumerable.sol#L7) allows old versions

contracts/base/ERC721Enumerable.sol#L7

- [ ] ID-31
Pragma version[^0.8.0](contracts/interfaces/IERC165.sol#L7) allows old versions

contracts/interfaces/IERC165.sol#L7

- [ ] ID-32
Pragma version[^0.8.0](contracts/interfaces/IERC721Receiver.sol#L7) allows old versions

contracts/interfaces/IERC721Receiver.sol#L7

- [ ] ID-33
Pragma version[^0.8.0](contracts/interfaces/IERC721.sol#L7) allows old versions

contracts/interfaces/IERC721.sol#L7

- [ ] ID-34
Pragma version[^0.8.0](contracts/OpenSeaIntegration.sol#L3) allows old versions

contracts/OpenSeaIntegration.sol#L3

## low-level-calls

Impact: Informational
Confidence: High

- [ ] ID-35
Low level call in [Address.sendValue(address,uint256)](contracts/libraries/Address.sol#L62-L73):
  - [(success) = recipient.call{value: amount}()](contracts/libraries/Address.sol#L68)

contracts/libraries/Address.sol#L62-L73

- [ ] ID-36
Low level call in [Address.functionStaticCall(address,bytes,string)](contracts/libraries/Address.sol#L188-L197):
  - [(success,returndata) = target.staticcall(data)](contracts/libraries/Address.sol#L195)

contracts/libraries/Address.sol#L188-L197

- [ ] ID-37
Low level call in [Address.functionCallWithValue(address,bytes,uint256,string)](contracts/libraries/Address.sol#L145-L161):
  - [(success,returndata) = target.call{value: value}(data)](contracts/libraries/Address.sol#L157-L159)

contracts/libraries/Address.sol#L145-L161

- [ ] ID-38
Low level call in [Address.functionDelegateCall(address,bytes,string)](contracts/libraries/Address.sol#L223-L232):
  - [(success,returndata) = target.delegatecall(data)](contracts/libraries/Address.sol#L230)

contracts/libraries/Address.sol#L223-L232

## naming-convention

Impact: Informational
Confidence: High

- [ ] ID-39
Parameter [ERC721.safeTransferFrom(address,address,uint256,bytes)._data](contracts/base/ERC721.sol#L238) is not in mixedCase

contracts/base/ERC721.sol#L238

- [ ] ID-40
Variable [LeandroLopes721._baseUri](contracts/LeandroLopes721.sol#L25) is not in mixedCase

contracts/LeandroLopes721.sol#L25

- [ ] ID-41
Parameter [LeandroLopes721.updateBaseUri(string)._newUri](contracts/LeandroLopes721.sol#L110) is not in mixedCase

contracts/LeandroLopes721.sol#L110
