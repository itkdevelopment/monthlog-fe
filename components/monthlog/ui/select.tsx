"use client";

import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2Icon,
} from "lucide-react";
import * as React from "react";

const selectTriggerVariants = cva(
  [
    "w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none",
    "flex cursor-pointer items-center justify-between gap-2 bg-transparent text-sm whitespace-nowrap",
    "placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
    "data-[placeholder]:text-gray-400 [&_svg:not([class*='text-'])]:text-gray-500",
    "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      size: {
        sm: "h-9 px-3 py-2",
        default: "h-12 px-4",
        lg: "h-14 px-4",
        xl: "h-16 px-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type SelectOptionProps = {
  label: string;
  value: string;
  disabled?: boolean;
  className?: string;
};
type SelectProps = Omit<
  React.ComponentProps<typeof SelectRoot>,
  "onValueChange"
> & {
  placeholder?: string;
  className?: string;
  options?: SelectOptionProps[];
  loading?: boolean;
  size?: "sm" | "default" | "lg" | "xl";
  onChange?: React.ComponentProps<typeof SelectRoot>["onValueChange"];
};

function Select({
  placeholder,
  className,
  options = [] as SelectOptionProps[],
  loading = false,
  disabled = false,
  size = "default",
  onChange,
  ...props
}: SelectProps) {
  return (
    <SelectRoot
      disabled={disabled || loading}
      onValueChange={onChange}
      {...props}
    >
      <SelectTrigger className={className} loading={loading} size={size}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent translate="no">
        <SelectGroup>
          {options.map((option) => (
            <div key={option.value}>
              <>
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={option.className}
                >
                  <span>{option.label}</span>
                </SelectItem>
              </>
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
}

function SelectRoot({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size,
  children,
  loading = false,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants> & {
    loading?: boolean;
  }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "[&_span]:truncate",
        selectTriggerVariants({ size }),
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        {loading ? (
          <Loader2Icon className="size-4 animate-spin opacity-50" />
        ) : (
          <ChevronDownIcon className="size-4 text-gray-500" />
        )}
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-white text-gray-900 border border-gray-300 rounded-lg shadow-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem]",
          "origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-gray-600 px-3 py-2 text-xs font-medium", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-2 rounded-md py-2 pr-8 pl-3 text-sm outline-none transition-colors select-none",
        "hover:bg-blue-50 focus:bg-blue-50 text-gray-900",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-blue-600" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-gray-200 pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4 text-gray-500" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4 text-gray-500" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};

export type { SelectOptionProps };
