/* eslint-disable react/prop-types */
import Link from "next/link";
const ErrorPage = ({error}:any) => {
  return (
    <div className="flex items-center justify-center flex-col h-[100vh] w-full p-7">
      <h2 style={{ marginBottom: "30px" }}>{error}</h2>
      <Link href={"/"}>Go Home</Link>
    </div>
  );
};

export default ErrorPage;
