import { Service } from './Services';
import { Expert } from './Expert';

export interface BookingModalProps {
    service: Service;
    expert: Expert;
    onClose: () => void;
}