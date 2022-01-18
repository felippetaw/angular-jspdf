import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


// Default export is a4 paper, portrait, using millimeters for units

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('test', {static: false}) test: ElementRef;
  title = 'angular8app';
  editor = ClassicEditor;
  config1 = {
    language: 'pt-br',
    mediaEmbed: {
      removeProviders: [ 'youtube' ]
    }
  };
  textForm = new FormGroup({
    htmlContent: new FormControl()
  });
  config: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '20rem',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Insira o texto aqui: *É possível inserir imagens e links através do menu superior. ',
      defaultParagraphSeparator: '',
      defaultFontName: 'Arial',
      defaultFontSize: '5px',
      toolbarHiddenButtons: [['']],
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  }

  @ViewChild('content', {static: true}) content: ElementRef;
  ngOnInit() {
    
  }
  onReady( editor ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
  }

  generatePdf() {
    var data = this.content.nativeElement;
    html2canvas(data).then(canvas => {
            var imgWidth = 208;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF();
            var position = 5;
            pdf.addImage(contentDataURL, 'PNG', position, position, imgWidth, imgHeight)
            pdf.save('newPDF.pdf');
        });
  }
}