export class MathUtils {
    static roundToNearestInteger(value: number): number {
        return Math.round(value);
    }

    static roundArray(array: number[]): number[] {
        return array.map(value => MathUtils.roundToNearestInteger(value));
    }
}
