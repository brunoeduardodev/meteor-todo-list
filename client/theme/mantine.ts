import { TextInput, createTheme } from "@mantine/core";

export const mantine = createTheme({
  components: {
    TextInput: TextInput.extend({
      styles: (theme) => ({
        root: {
          minWidth: "20rem",
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.xs,
        },
      }),
    }),
  },
});
