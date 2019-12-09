import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AfeFormControl, AfeFormArray, AfeFormGroup, AfeControlType } from '../../abstract-controls-extension';
import { QuestionBase } from '../question-models/question-base';
import { ValidationFactory } from '../form-factory/validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
let FormControlService = class FormControlService {
    constructor(validationFactory, hidersDisablersFactory, alertsFactory) {
        this.alertsFactory = alertsFactory;
        this.controls = [];
        this.validationFactory = validationFactory;
        this.hidersDisablersFactory = hidersDisablersFactory;
    }
    generateControlModel(questionModel, parentControl, generateChildren, form) {
        if (questionModel instanceof QuestionBase) {
            if (questionModel.controlType === AfeControlType.AfeFormArray) {
                return this.generateFormArray(questionModel, parentControl, form);
            }
            if (questionModel.controlType === AfeControlType.AfeFormGroup) {
                return this.generateFormGroupModel(questionModel, generateChildren, parentControl, form);
            }
            if (questionModel.controlType === AfeControlType.AfeFormControl) {
                return this.generateFormControl(questionModel, parentControl, form);
            }
        }
        return null;
    }
    generateFormGroupModel(question, generateChildren, parentControl, form) {
        const formGroup = new AfeFormGroup({});
        this.wireHidersDisablers(question, formGroup, form);
        this.wireAlerts(question, formGroup, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formGroup);
        }
        const asGroup = question;
        if (generateChildren && asGroup && asGroup.questions.length > 0) {
            this._generateFormGroupChildrenModel(asGroup.questions, formGroup, form);
        }
        return formGroup;
    }
    _generateFormGroupChildrenModel(questions, parentControl, form) {
        if (questions.length > 0) {
            questions.forEach(element => {
                const generated = this.generateControlModel(element, parentControl, true, form);
                if (generated !== null) {
                    parentControl.addControl(element.key, generated);
                }
            });
        }
    }
    generateFormArray(question, parentControl, form) {
        const validators = this.validationFactory.getValidators(question, form);
        let formArray;
        if (validators && validators.length > 0) {
            formArray = new AfeFormArray([], validators[0]);
        }
        else {
            formArray = new AfeFormArray([]);
        }
        formArray.uuid = question.key;
        this.wireHidersDisablers(question, formArray, form);
        this.wireAlerts(question, formArray, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formArray);
        }
        return formArray;
    }
    generateFormControl(question, parentControl, form) {
        const value = question.defaultValue || '';
        const validators = this.validationFactory.getValidators(question, form);
        const control = new AfeFormControl(value, validators);
        control.uuid = question.key;
        this.wireHidersDisablers(question, control, form);
        this.wireAlerts(question, control, form);
        this.wireCalculator(question, control, (form ? form.dataSourcesContainer.dataSources : null));
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, control);
        }
        return control;
    }
    wireAlerts(question, control, form) {
        if (question.alert && question.alert !== '') {
            const alert = this.alertsFactory.getJsExpressionshowAlert(question, control, form);
            control.setAlertFn(alert);
        }
    }
    wireHidersDisablers(question, control, form) {
        if (question.hide && question.hide !== '') {
            const hider = this.hidersDisablersFactory.getJsExpressionHider(question, control, form);
            control.setHidingFn(hider);
        }
        if (question.disable && question.disable !== '') {
            const disable = this.hidersDisablersFactory.getJsExpressionDisabler(question, control, form);
            control.setDisablingFn(disable);
        }
    }
    wireCalculator(question, control, dataSource) {
        if (question.calculateExpression && question.calculateExpression !== '') {
            const helper = new JsExpressionHelper();
            const runner = new ExpressionRunner();
            const runnable = runner.getRunnable(question.calculateExpression, control, helper.helperFunctions, dataSource);
            // this functionality strictly assumes the calculateExpression function has been defined in the JsExpressionHelper class
            control.setCalculatorFn(runnable.run);
        }
    }
};
FormControlService.ctorParameters = () => [
    { type: ValidationFactory },
    { type: HidersDisablersFactory },
    { type: AlertsFactory }
];
FormControlService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ValidationFactory,
        HidersDisablersFactory, AlertsFactory])
], FormControlService);
export { FormControlService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW1wYXRoLWtlbnlhL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0tY29udHJvbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQ2xFLE1BQU0sbUNBQW1DLENBQUM7QUFJM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRWhFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUlyRSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUszQixZQUFZLGlCQUFvQyxFQUM1QyxzQkFBOEMsRUFBVSxhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUx4RixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBTVYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztJQUN6RCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsYUFBNEMsRUFBRSxhQUEyQixFQUMxRixnQkFBeUIsRUFBRSxJQUFXO1FBQ3RDLElBQUksYUFBYSxZQUFZLFlBQVksRUFBRTtZQUN2QyxJQUFJLGFBQWEsQ0FBQyxXQUFXLEtBQUssY0FBYyxDQUFDLFlBQVksRUFBRTtnQkFDM0QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyRTtZQUNELElBQUksYUFBYSxDQUFDLFdBQVcsS0FBSyxjQUFjLENBQUMsWUFBWSxFQUFFO2dCQUMzRCxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVGO1lBRUQsSUFBSSxhQUFhLENBQUMsV0FBVyxLQUFLLGNBQWMsQ0FBQyxjQUFjLEVBQUU7Z0JBQzdELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkU7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxRQUFzQixFQUFFLGdCQUF5QixFQUNwRSxhQUE0QixFQUFFLElBQVc7UUFDekMsTUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksYUFBYSxZQUFZLFlBQVksRUFBRTtZQUN2QyxhQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDckQ7UUFFRCxNQUFNLE9BQU8sR0FBRyxRQUF5QixDQUFDO1FBRTFDLElBQUksZ0JBQWdCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM3RCxJQUFJLENBQUMsK0JBQStCLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUU7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsK0JBQStCLENBQUMsU0FBeUIsRUFBRSxhQUEyQixFQUFFLElBQVc7UUFFL0YsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0QixTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN4QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2hGLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtvQkFDcEIsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUNwRDtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBR0QsaUJBQWlCLENBQUMsUUFBc0IsRUFBRSxhQUE0QixFQUFFLElBQVc7UUFFL0UsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxTQUF1QixDQUFDO1FBQzVCLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JDLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNKLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuQztRQUNGLFNBQVMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxhQUFhLFlBQVksWUFBWSxFQUFFO1lBQ3ZDLGFBQWEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNyRDtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxRQUFzQixFQUFFLGFBQTRCLEVBQUUsSUFBVztRQUVqRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQztRQUMxQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV4RSxNQUFNLE9BQU8sR0FBRyxJQUFJLGNBQWMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdEQsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFOUYsSUFBSSxhQUFhLFlBQVksWUFBWSxFQUFFO1lBQ3ZDLGFBQWEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNuRDtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTyxVQUFVLENBQUMsUUFBc0IsRUFDckMsT0FBcUQsRUFBRSxJQUFXO1FBQ2xFLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUN6QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkYsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFDTyxtQkFBbUIsQ0FBQyxRQUFzQixFQUM5QyxPQUFxRCxFQUFFLElBQVc7UUFDbEUsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hGLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7UUFFRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7WUFDN0MsTUFBTSxPQUFPLEdBQ1QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHVCQUF1QixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakYsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFFTyxjQUFjLENBQUMsUUFBc0IsRUFDekMsT0FBdUIsRUFBRSxVQUFnQjtRQUN6QyxJQUFJLFFBQVEsQ0FBQyxtQkFBbUIsSUFBSSxRQUFRLENBQUMsbUJBQW1CLEtBQUssRUFBRSxFQUFFO1lBQ3JFLE1BQU0sTUFBTSxHQUF1QixJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDNUQsTUFBTSxNQUFNLEdBQXFCLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUN4RCxNQUFNLFFBQVEsR0FBYSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFDcEUsT0FBTyxFQUNULE1BQU0sQ0FBQyxlQUFlLEVBQ3RCLFVBQVUsQ0FBQyxDQUFDO1lBQ2hCLHdIQUF3SDtZQUN4SCxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6QztJQUVMLENBQUM7Q0FFSixDQUFBOztZQS9Ia0MsaUJBQWlCO1lBQ3BCLHNCQUFzQjtZQUF5QixhQUFhOztBQU4vRSxrQkFBa0I7SUFEOUIsVUFBVSxFQUFFOzZDQU1zQixpQkFBaUI7UUFDcEIsc0JBQXNCLEVBQXlCLGFBQWE7R0FOL0Usa0JBQWtCLENBb0k5QjtTQXBJWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEFmZUZvcm1Db250cm9sLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCwgQWZlQ29udHJvbFR5cGVcbn0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcblxuaW1wb3J0IHsgTmVzdGVkUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9uZXN0ZWQtcXVlc3Rpb25zJztcblxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSB9IGZyb20gJy4vaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5JztcbmltcG9ydCB7IEFsZXJ0c0ZhY3RvcnkgfSBmcm9tICcuL3Nob3ctbWVzc2FnZXMuZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcbmltcG9ydCB7IEV4cHJlc3Npb25SdW5uZXIsIFJ1bm5hYmxlIH0gZnJvbSAnLi4vZXhwcmVzc2lvbi1ydW5uZXIvZXhwcmVzc2lvbi1ydW5uZXInO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9qcy1leHByZXNzaW9uLWhlbHBlcic7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1Db250cm9sU2VydmljZSB7XG4gICAgY29udHJvbHMgPSBbXTtcbiAgICB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3Rvcnk7XG4gICAgaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTogSGlkZXJzRGlzYWJsZXJzRmFjdG9yeTtcblxuICAgIGNvbnN0cnVjdG9yKHZhbGlkYXRpb25GYWN0b3J5OiBWYWxpZGF0aW9uRmFjdG9yeSxcbiAgICAgICAgaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTogSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSwgcHJpdmF0ZSBhbGVydHNGYWN0b3J5OiBBbGVydHNGYWN0b3J5KSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkgPSB2YWxpZGF0aW9uRmFjdG9yeTtcbiAgICAgICAgdGhpcy5oaWRlcnNEaXNhYmxlcnNGYWN0b3J5ID0gaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUNvbnRyb2xNb2RlbChxdWVzdGlvbk1vZGVsOiBRdWVzdGlvbkJhc2UgfCBOZXN0ZWRRdWVzdGlvbiwgcGFyZW50Q29udHJvbDogQWZlRm9ybUdyb3VwLFxuICAgICAgICBnZW5lcmF0ZUNoaWxkcmVuOiBib29sZWFuLCBmb3JtPzogRm9ybSk6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uTW9kZWwgaW5zdGFuY2VvZiBRdWVzdGlvbkJhc2UpIHtcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbk1vZGVsLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQXJyYXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1BcnJheShxdWVzdGlvbk1vZGVsLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChxdWVzdGlvbk1vZGVsLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5BZmVGb3JtR3JvdXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1Hcm91cE1vZGVsKHF1ZXN0aW9uTW9kZWwsIGdlbmVyYXRlQ2hpbGRyZW4sIHBhcmVudENvbnRyb2wsIGZvcm0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocXVlc3Rpb25Nb2RlbC5jb250cm9sVHlwZSA9PT0gQWZlQ29udHJvbFR5cGUuQWZlRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1Db250cm9sKHF1ZXN0aW9uTW9kZWwsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdlbmVyYXRlRm9ybUdyb3VwTW9kZWwocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgZ2VuZXJhdGVDaGlsZHJlbjogYm9vbGVhbixcbiAgICAgICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBZmVGb3JtR3JvdXAge1xuICAgICAgICBjb25zdCBmb3JtR3JvdXAgPSBuZXcgQWZlRm9ybUdyb3VwKHt9KTtcbiAgICAgICAgdGhpcy53aXJlSGlkZXJzRGlzYWJsZXJzKHF1ZXN0aW9uLCBmb3JtR3JvdXAsIGZvcm0pO1xuICAgICAgICB0aGlzLndpcmVBbGVydHMocXVlc3Rpb24sIGZvcm1Hcm91cCwgZm9ybSk7XG4gICAgICAgIGlmIChwYXJlbnRDb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUdyb3VwKSB7XG4gICAgICAgICAgICBwYXJlbnRDb250cm9sLnNldENvbnRyb2wocXVlc3Rpb24ua2V5LCBmb3JtR3JvdXApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXNHcm91cCA9IHF1ZXN0aW9uIGFzIFF1ZXN0aW9uR3JvdXA7XG5cbiAgICAgICAgaWYgKGdlbmVyYXRlQ2hpbGRyZW4gJiYgYXNHcm91cCAmJiBhc0dyb3VwLnF1ZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZUZvcm1Hcm91cENoaWxkcmVuTW9kZWwoYXNHcm91cC5xdWVzdGlvbnMsIGZvcm1Hcm91cCwgZm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybUdyb3VwO1xuICAgIH1cblxuICAgIF9nZW5lcmF0ZUZvcm1Hcm91cENoaWxkcmVuTW9kZWwocXVlc3Rpb25zOiBRdWVzdGlvbkJhc2VbXSwgcGFyZW50Q29udHJvbDogQWZlRm9ybUdyb3VwLCBmb3JtPzogRm9ybSkge1xuXG4gICAgICAgIGlmIChxdWVzdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcXVlc3Rpb25zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVkID0gdGhpcy5nZW5lcmF0ZUNvbnRyb2xNb2RlbChlbGVtZW50LCBwYXJlbnRDb250cm9sLCB0cnVlLCBmb3JtKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2VuZXJhdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRyb2wuYWRkQ29udHJvbChlbGVtZW50LmtleSwgZ2VuZXJhdGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2VuZXJhdGVGb3JtQXJyYXkocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBZmVGb3JtQXJyYXkge1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmdldFZhbGlkYXRvcnMocXVlc3Rpb24sIGZvcm0pO1xuICAgICAgICAgbGV0IGZvcm1BcnJheTogQWZlRm9ybUFycmF5O1xuICAgICAgICAgaWYgKHZhbGlkYXRvcnMgJiYgdmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgZm9ybUFycmF5ID0gbmV3IEFmZUZvcm1BcnJheShbXSwgdmFsaWRhdG9yc1swXSk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9ybUFycmF5ID0gbmV3IEFmZUZvcm1BcnJheShbXSk7XG4gICAgICAgICB9XG4gICAgICAgIGZvcm1BcnJheS51dWlkID0gcXVlc3Rpb24ua2V5O1xuICAgICAgICB0aGlzLndpcmVIaWRlcnNEaXNhYmxlcnMocXVlc3Rpb24sIGZvcm1BcnJheSwgZm9ybSk7XG4gICAgICAgIHRoaXMud2lyZUFsZXJ0cyhxdWVzdGlvbiwgZm9ybUFycmF5LCBmb3JtKTtcbiAgICAgICAgaWYgKHBhcmVudENvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtR3JvdXApIHtcbiAgICAgICAgICAgIHBhcmVudENvbnRyb2wuc2V0Q29udHJvbChxdWVzdGlvbi5rZXksIGZvcm1BcnJheSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybUFycmF5O1xuICAgIH1cblxuICAgIGdlbmVyYXRlRm9ybUNvbnRyb2wocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCwgZm9ybT86IEZvcm0pOiBBZmVGb3JtQ29udHJvbCB7XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBxdWVzdGlvbi5kZWZhdWx0VmFsdWUgfHwgJyc7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmdldFZhbGlkYXRvcnMocXVlc3Rpb24sIGZvcm0pO1xuXG4gICAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgQWZlRm9ybUNvbnRyb2wodmFsdWUsIHZhbGlkYXRvcnMpO1xuICAgICAgICBjb250cm9sLnV1aWQgPSBxdWVzdGlvbi5rZXk7XG4gICAgICAgIHRoaXMud2lyZUhpZGVyc0Rpc2FibGVycyhxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgIHRoaXMud2lyZUFsZXJ0cyhxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgIHRoaXMud2lyZUNhbGN1bGF0b3IocXVlc3Rpb24sIGNvbnRyb2wsIChmb3JtID8gZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcyA6IG51bGwpKTtcblxuICAgICAgICBpZiAocGFyZW50Q29udHJvbCBpbnN0YW5jZW9mIEFmZUZvcm1Hcm91cCkge1xuICAgICAgICAgICAgcGFyZW50Q29udHJvbC5zZXRDb250cm9sKHF1ZXN0aW9uLmtleSwgY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29udHJvbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHdpcmVBbGVydHMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICAgICAgY29udHJvbDogQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHwgQWZlRm9ybUNvbnRyb2wsIGZvcm0/OiBGb3JtKSB7XG4gICAgICAgIGlmIChxdWVzdGlvbi5hbGVydCAmJiBxdWVzdGlvbi5hbGVydCAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsZXJ0ID0gdGhpcy5hbGVydHNGYWN0b3J5LmdldEpzRXhwcmVzc2lvbnNob3dBbGVydChxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICBjb250cm9sLnNldEFsZXJ0Rm4oYWxlcnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgd2lyZUhpZGVyc0Rpc2FibGVycyhxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgICAgICBjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCwgZm9ybT86IEZvcm0pIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uLmhpZGUgJiYgcXVlc3Rpb24uaGlkZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IGhpZGVyID0gdGhpcy5oaWRlcnNEaXNhYmxlcnNGYWN0b3J5LmdldEpzRXhwcmVzc2lvbkhpZGVyKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtKTtcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0SGlkaW5nRm4oaGlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHF1ZXN0aW9uLmRpc2FibGUgJiYgcXVlc3Rpb24uZGlzYWJsZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpc2FibGUgPVxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZXJzRGlzYWJsZXJzRmFjdG9yeS5nZXRKc0V4cHJlc3Npb25EaXNhYmxlcihxdWVzdGlvbiwgY29udHJvbCwgZm9ybSk7XG4gICAgICAgICAgICBjb250cm9sLnNldERpc2FibGluZ0ZuKGRpc2FibGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3aXJlQ2FsY3VsYXRvcihxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgICAgICBjb250cm9sOiBBZmVGb3JtQ29udHJvbCwgZGF0YVNvdXJjZT86IGFueSkge1xuICAgICAgICBpZiAocXVlc3Rpb24uY2FsY3VsYXRlRXhwcmVzc2lvbiAmJiBxdWVzdGlvbi5jYWxjdWxhdGVFeHByZXNzaW9uICE9PSAnJykge1xuICAgICAgICAgICAgY29uc3QgaGVscGVyOiBKc0V4cHJlc3Npb25IZWxwZXIgPSBuZXcgSnNFeHByZXNzaW9uSGVscGVyKCk7XG4gICAgICAgICAgICBjb25zdCBydW5uZXI6IEV4cHJlc3Npb25SdW5uZXIgPSBuZXcgRXhwcmVzc2lvblJ1bm5lcigpO1xuICAgICAgICAgICAgY29uc3QgcnVubmFibGU6IFJ1bm5hYmxlID0gcnVubmVyLmdldFJ1bm5hYmxlKHF1ZXN0aW9uLmNhbGN1bGF0ZUV4cHJlc3Npb25cbiAgICAgICAgICAgICAgICAsIGNvbnRyb2wsXG4gICAgICAgICAgICAgICAgaGVscGVyLmhlbHBlckZ1bmN0aW9ucyxcbiAgICAgICAgICAgICAgICBkYXRhU291cmNlKTtcbiAgICAgICAgICAgIC8vIHRoaXMgZnVuY3Rpb25hbGl0eSBzdHJpY3RseSBhc3N1bWVzIHRoZSBjYWxjdWxhdGVFeHByZXNzaW9uIGZ1bmN0aW9uIGhhcyBiZWVuIGRlZmluZWQgaW4gdGhlIEpzRXhwcmVzc2lvbkhlbHBlciBjbGFzc1xuICAgICAgICAgICAgY29udHJvbC5zZXRDYWxjdWxhdG9yRm4ocnVubmFibGUucnVuKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iXX0=