import { createAsyncThunk } from "@reduxjs/toolkit";

export const findRoutes = createAsyncThunk("findRoutes", async (data, api) => {
  const result = await fetch(
    "http://localhost:3000/profile/routes/findRoutes",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());

  if (result.success !== true) return api.rejectWithValue(result.message);
  return result;
});
