import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { THEME_COLORS } from "../../constants";
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

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {(["theme-1", "theme-2", "theme-3"] as const).map((theme) => (
        <div
          key={theme}
          style={{
            ...THEME_COLORS[theme],
            display: "flex",
            gap: "16px",
            alignItems: "center",
            padding: "24px",
            background: "var(--color-background)",
          }}
        >
          <Button variant="type-1">5</Button>
          <Button variant="type-2">RESET</Button>
          <Button variant="type-3">=</Button>
        </div>
      ))}
    </div>
  ),
};
