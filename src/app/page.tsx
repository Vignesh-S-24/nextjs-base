import { redirect } from "next/navigation";

export default function Page(): never {
    redirect('/login');
}
// This page redirects to the login page when accessed directly.
// It is useful for ensuring that users are directed to the login page