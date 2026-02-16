import { ButtonSize } from '../types';
import { ButtonVariant } from '../types';
import { ButtonType } from '../types';

export interface ButtonProps {
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
}

