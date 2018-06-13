import { NgModule } from '@angular/core';
import { CustomHeaderComponent } from './custom-header/custom-header';
import { CalendarComponent } from './calendar/calendar';
import { ScanComponent } from './scan/scan';
@NgModule({
	declarations: [CustomHeaderComponent,
    CalendarComponent,
    ScanComponent],
	imports: [],
	exports: [CustomHeaderComponent,
    CalendarComponent,
    ScanComponent]
})
export class ComponentsModule {}
