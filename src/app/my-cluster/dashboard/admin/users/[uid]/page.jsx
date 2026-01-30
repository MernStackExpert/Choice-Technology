import UserDetailsController from "@/Components/ADMIN/Users/UserDetailsController";


export const metadata = {
  title: "User Intelligence Details | Admin",
};

export default async function UserDetailsPage({ params }) {
  const { uid } = await params; 

  return (
    <div className="w-full min-h-screen pt-24 pb-12">
      <UserDetailsController uid={uid} />
    </div>
  );
}