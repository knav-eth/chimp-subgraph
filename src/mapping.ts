import { CHIMP, Transfer } from "../generated/CHIMP/CHIMP"
import { CHIMPImage } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let tokenId = event.params.tokenId
  let chimpImage = CHIMPImage.load(tokenId.toString())

  if (chimpImage == null) {
    chimpImage = new CHIMPImage(tokenId.toString())

    let contract = CHIMP.bind(event.address)
    chimpImage.name = "CHIMP #" + tokenId.toString()
    chimpImage.image = contract.tokenSVG(tokenId)
    chimpImage.numericId = tokenId.toI32()
    chimpImage.author = event.params.to
  }

  chimpImage.owner = event.params.to
  chimpImage.save()
}
