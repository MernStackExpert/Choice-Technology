import ManageUsersController from "@/Components/ADMIN/ADMIN_PAGES/ManageUsersController/ManageUsersController";

export const metadata = {
  title: "Manage Users | Choice Technology Admin",
  description: "Monitor and manage all users within the Choice Technology neural network.",
};

export default function ManageUsersPage() {
  return <ManageUsersController />;
}