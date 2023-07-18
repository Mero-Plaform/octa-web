export class ChartData {
  label: string;
  borderColor: string;
  data: number[] = [];
  borderWidth = 1;
  tension = 0.1;

  constructor(label: ChartData["label"], borderColor: ChartData["borderColor"]) {
    this.label = label;
    this.borderColor = borderColor;
  }
}
