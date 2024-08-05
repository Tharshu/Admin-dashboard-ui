import { Component, inject, OnInit } from "@angular/core";
import { BackButtonComponent } from "../../../shared/back-button/back-button.component";
import { Reason } from "../../../core/model/reason.model";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ReasonService } from "../../../core/services/reason.service";

@Component({
  selector: "app-reasons",
  standalone: true,
  imports: [BackButtonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: "./reasons.component.html",
  styleUrl: "./reasons.component.css",
})
export class ReasonsComponent implements OnInit {
  reasonService = inject(ReasonService);

  form: FormGroup;
  selectedReasonId: number = 0;
  selectedReason: string = "";
  selectedCode: string = "";
  selectedDescription: string = "";
  selectedActive: boolean = true;

  reason: Reason | any;
  reasons: Reason[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [],
      code: [""],
      reasons: [""],
      isActive: [true],
      description: [""],
    });
  }
  ngOnInit(): void {
    this.getAllReasons();
  }

  selectReason(reason: any) {
    this.selectedReasonId = reason.id;
    this.selectedCode = reason.code;
    this.selectedReason = reason.reasons;
    this.selectedDescription = reason.description;
    this.selectedActive = reason.isActive;
  }

  clearSelection() {
    // this.selectedReasonId = ;
    this.selectedReason = "";
    this.selectedCode = "";
    this.selectedDescription = "";
    this.selectedActive = false;
  }

  createReason() {
    if (this.form.valid) {
      const formValue = this.form.value;
      console.log("Form value variant", formValue);

      const payload: Reason = {
        id: formValue.id,
        code: formValue.code,
        reasons: formValue.reasons,
        isActive: true,
        description: formValue.description,
      };

      this.reasonService.createReason(payload).subscribe({
        next: (res) => {
          this.reason = res.data;
          console.log("Response => ", this.reason);
          this.getAllReasons();
          this.form.reset();
        },
        error: (error) => {
          console.error("Error creating reason.", error);
        },
      });
    }
  }

  getAllReasons() {
    this.reasonService.getAllReasons().subscribe({
      next: (data) => {
        this.reasons = data.data;
      },
      error: (error) => {
        console.error("error getting reason.");
      },
    });
  }

  toggleBlock(active: boolean): void {
    active = !active;
    this.selectedActive = active;
  }
}
