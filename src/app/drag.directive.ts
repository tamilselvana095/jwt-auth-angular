
import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FileHandle } from './_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<FileHandle>=new EventEmitter();

  @HostBinding("style.background") private background="#eee"
  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover",["$event"])
  public onDragOver(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.background ="#999";
  }

  @HostListener("dragleave",["$event"])
  public onDragLeave(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.background="#eee"

  }

  @HostListener("drop",["$event"])
  public onDrop(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.background="#eee";

    let fileHandle: FileHandle | null = null;

    const file=event.dataTransfer!.files[0];
    const url=this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));

    fileHandle={file,url};
    this.files.emit(fileHandle);


  }

}
