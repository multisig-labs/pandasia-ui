export function shortenNodeId(nodeId: string) {
  return nodeId.slice(0, 12).concat('...').concat(nodeId.slice(-6));
}

export function copyText(text: string) {
  navigator.clipboard.writeText(text);
}
