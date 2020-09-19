import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PuntajesPage } from './puntajes.page';

describe('PuntajesPage', () => {
  let component: PuntajesPage;
  let fixture: ComponentFixture<PuntajesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntajesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PuntajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
