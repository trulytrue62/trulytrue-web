"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Controller, type UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { scamTypes } from "@/data/scam-types"
import type { ReportFormValues } from "@/components/report-form/report-schema"

export function StepScamDetails({ form }: { form: UseFormReturn<ReportFormValues> }) {
  const [datePopoverOpen, setDatePopoverOpen] = useState(false)

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="scamType">Type of scam</FieldLabel>
        <Controller
          control={form.control}
          name="scamType"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="scamType" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {scamTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[form.formState.errors.scamType]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="description">What happened?</FieldLabel>
        <Textarea
          id="description"
          placeholder="Describe what happened, in as much detail as you can share."
          rows={5}
          {...form.register("description")}
        />
        <FieldError errors={[form.formState.errors.description]} />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="incidentDate">Date of the incident</FieldLabel>
          <Controller
            control={form.control}
            name="incidentDate"
            render={({ field }) => (
              <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      id="incidentDate"
                      type="button"
                      variant="outline"
                      className="w-full justify-between font-normal"
                    />
                  }
                >
                  {field.value ? format(field.value, "PPP") : "Select date"}
                  <ChevronDownIcon data-icon="inline-end" />
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    captionLayout="dropdown"
                    defaultMonth={field.value}
                    disabled={{ after: new Date() }}
                    onSelect={(date) => {
                      field.onChange(date)
                      setDatePopoverOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          <FieldError errors={[form.formState.errors.incidentDate]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="incidentTime">Time of the incident</FieldLabel>
          <Input
            id="incidentTime"
            type="time"
            className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            {...form.register("incidentTime")}
          />
          <FieldError errors={[form.formState.errors.incidentTime]} />
        </Field>
      </div>
    </FieldGroup>
  )
}
