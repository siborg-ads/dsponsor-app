
import { toUtf8Bytes, keccak256 } from "ethers/lib/utils";



export default function stringToUint256(s) {
  const normalized = s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]/gi, "");

  return BigInt(keccak256(toUtf8Bytes(normalized)));
}
