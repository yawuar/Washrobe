import { NgModule } from '@angular/core';
import { KeysPipe } from './keys/keys';
import { GetItemPipe } from './get-item/get-item';
@NgModule({
	declarations: [KeysPipe,
    GetItemPipe],
	imports: [],
	exports: [KeysPipe,
    GetItemPipe]
})
export class PipesModule {}
