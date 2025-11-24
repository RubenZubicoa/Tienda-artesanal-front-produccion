import {
  AfterViewInit,
  Directive,
  ElementRef,
  Host,
  inject,
  Input,
  Optional,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTruncateText]',
  standalone: true,
})
export class TruncateTextDirective implements AfterViewInit {
  @Input({ required: false }) maxLength: number = 100;

  private element: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  ngAfterViewInit(): void {
    const originalText = this.element.nativeElement.innerText.trim();
    const limit = this.maxLength;

    if (originalText.length > limit) {
      const truncated = this.truncateByWords(originalText, limit);
      this.renderer.setProperty(this.element.nativeElement, 'innerHTML', '');
      const textNode = this.renderer.createText(truncated + ' ');
      this.renderer.appendChild(this.element.nativeElement, textNode);
    }
  }

  private truncateByWords(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;

    const words = text.split(' ');
    let result = '';

    for (const word of words) {
      if ((result + word).length + 1 > maxLength) break;
      result += (result ? ' ' : '') + word;
    }

    return result + '...';
  }
}
