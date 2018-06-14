import { NgModule } from '@angular/core';
import { CustomHeaderComponent } from './custom-header/custom-header';
import { CalendarComponent } from './calendar/calendar';
import { ScanComponent } from './scan/scan';
import { DeleteComponent } from './delete/delete';
@NgModule({
	declarations: [CustomHeaderComponent,
    CalendarComponent,
    ScanComponent,
    DeleteComponent],
	imports: [],
	exports: [CustomHeaderComponent,
    CalendarComponent,
    ScanComponent,
    DeleteComponent]
})
export class ComponentsModule {}
