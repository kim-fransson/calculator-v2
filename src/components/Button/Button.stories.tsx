import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";

const meta = {
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["type-1", "type-2", "type-3"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Type1: Story = {
  args: {
    variant: "type-1",
    children: "5",
  },
};

export const Type2: Story = {
  args: {
    variant: "type-2",
    children: "RESET",
  },
};

export const Type3: Story = {
  args: {
    variant: "type-3",
    children: "=",
  },
};
