import { Semesters } from './../../../data-models/datamodels';
import { DataflowService } from './../../../services/dataflow.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.scss']
})
export class SemesterComponent implements OnInit {

  selectedItem: any = {}

semesters: any = [
    {
      level: 1,
      font: "#0F54C9",
      w: "#DAE4F1",
      d: "#8B9CB2"
    },
    {
      level: 2,
      font: "#BD2A22",
      w: "#F5E2E2",
      d: "#8F4B47"
    }
 
  ]

  colorPallet: any = [
    "#000000", "#C23564", "#D5EDED", "#8F4B47", "#8F4B47",
    "#0F56CD", "#353745", "#FDEDF2", "#8F4B47", "#8F4B47"
  ]

  color: string = "#FFFFF"

  constructor(private router: Router, private dataService: DataflowService) { }

  ngOnInit(): void {
     this.dataService.getSemesters().subscribe((data: any) => {
      this.semesters = data.map(
        (document: any) =>
          ({
            // eslint-disable-next-line @typescript-eslint/ban-types
            ...(document.payload.doc.data() as {}),
            //id: document.payload.doc.id,
          } as Semesters)
      );
    });
  }

  selectItemtoColor(level: number, prop: string) {
    this.selectedItem = {
      level: level, prop: prop
    }

    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.add("activeRequest")
    }

    const colorsDisp = document.getElementById("color-pallet")
    if (
      colorsDisp
    ) colorsDisp.style.display = "block";

  }

  setColor(color: string) {
    let newLevels = this.semesters;
    newLevels.forEach((level: any) => {
      if (level.level == this.selectedItem.level) {
        if (this.selectedItem.prop == "font") {
          level.fontColor = color
        } else if (this.selectedItem.prop == "w") {
          level.bgColor = color
        } else {
          level.borderColor = color
        }
      }
    });

    this.color = color;
    const colorsDisp = document.getElementById("color-pallet")

    if (
      colorsDisp
    ) colorsDisp.style.display = "none";

    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.remove("activeRequest")
    }
  }

  changeColor(color: string) {
    let flagcolor = ""
    this.setColor(this.color);
    this.colorPallet.forEach((color: string) => {
      if (this.color === color) {
        flagcolor = color
      }
    });
    if (flagcolor.length === 0) {
      this.colorPallet.push(this.color)
    }
  }


  closeDialog() {
    const colorsDisp = document.getElementById("color-pallet")
    if (
      colorsDisp
    ) colorsDisp.style.display = "none";

    const darkbg = document.getElementById("request-bg");
    if (darkbg) {
      darkbg.classList.remove("activeRequest")
    }
  }

  done() {
    this.dataService.updateSemesters(this.semesters);
    this.router.navigate(['home'])
  }
}
