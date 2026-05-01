import { Plugin, MarkdownPostProcessorContext } from 'obsidian'

export default class IframeAttachmentPlugin extends Plugin {
  onload() {
    this.registerMarkdownCodeBlockProcessor('iframe-from-attachment', this.iFrameProcessor.bind(this));
  }

  async iFrameProcessor (Source:string, Element:HTMLElement, Context:MarkdownPostProcessorContext) {
    const Match = /^(\S+)(?:\s+(\d+)(?:x(\d+))?)?$/.exec(Source.trim())
    if (Match == null) {
      console.error('invalid arguments for "iframe-from-attachment"',Source)
      Element.createEl('p', { text:`Error: invalid arguments for "iframe-from-attachment" ("${Source}")` })
      return
    }
    
    const [, Attachment, Width,Height] = Match
    try {
      const absolutePath = this.getAbsolutePath(Attachment,Context)
      
      const iFrame = Element.createEl('iframe')
      iFrame.src = absolutePath
      if (Width  != null) { iFrame.width  = Width }
      if (Height != null) { iFrame.height = Height }
    } catch (Signal:unknown) {
      console.error('"iframe-from-attachment" processing failed with',Signal)

      const Message = Signal instanceof Error ? Signal.message : String(Signal)
      Element.createEl('p', { text:`Error: "iframe-from-attachment" processing failed with ${Message}` })
    }
  }

  getAbsolutePath (Attachment:string, Context:MarkdownPostProcessorContext):string {
    const { vault }   = this.app
    const currentFile = Context.sourcePath
    
    let AttachmentFile = vault.getFileByPath(Attachment)
    if (AttachmentFile == null) {
      const currentFolder = currentFile.substring(0,currentFile.lastIndexOf('/'))
      AttachmentFile = vault.getFileByPath(
        `${currentFolder}/${Attachment}`
      )
    }
  
    if (AttachmentFile == null) {
      throw new Error(`Attachment not found ("${Attachment}")`)
    }
  
    return vault.getResourcePath(AttachmentFile)
  }  
}
