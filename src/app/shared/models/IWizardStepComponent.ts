/** Defines a component to be rendered as a step */
export interface IWizardStepComponent {
  /** Indicates whether the component should be rendered in edit mode or not */
  isEditable: boolean;

  /** Indicates whether the component should display the data from the selector or not */
  isCompleted: boolean;

  /**  Completes the step as example by saving the data */
  complete(): void;
}
