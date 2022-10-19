import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder :string ='';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  deBouncer: Subject<string> = new Subject();

  termino: string = "";

  ngOnInit(): void {
    this.deBouncer.pipe(debounceTime(400)).subscribe(valor => {
      this.onDebounce.emit(valor);
    });
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada() {
    this.deBouncer.next(this.termino);
  }

}
