import { NgModule } from '@angular/core';
import { CustomHeaderComponent } from './custom-header/custom-header';
import { CalendarComponent } from './calendar/calendar';
@NgModule({
	declarations: [CustomHeaderComponent,
    CalendarComponent],
	imports: [],
	exports: [CustomHeaderComponent,
    CalendarComponent]
})
export class ComponentsModule {}
