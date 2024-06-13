import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("auth/getUser", async (_, api) => {
	const rawRes = await fetch("http://localhost:3000/profile/find", {
		credentials: "include",
	});
	const res = await rawRes.json();
	if (!res.success) return api.rejectWithValue(res.message);
	return res.data;
});
