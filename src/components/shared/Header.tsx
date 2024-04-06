import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { auth } from "@clerk/nextjs";


const Header = () => {
  const { sessionClaims } = auth();
  const userRole = sessionClaims?.metadata?.role;
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src="/assets/images/gradebook.svg" width={128} height={38} alt="Gradebook Logo" />
        </Link>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button>
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
      <nav className="flex justify-center space-x-4 py-4">
      {userRole === 'student' && (
        <>
        {/*Button to see current classes > assigments by classes*/}
          <Link href="/my-classes" passHref>
            <Button>My Classes</Button>
          </Link>

          {/*Button to see gradebook by semester > classes*/}
          <Link href="/GradeBook" passHref>
            <Button>Grade Book</Button>
          </Link>
          
          <Link href="../../sections/enroll" passHref>
            <Button>Enroll to Classes</Button>
          </Link>
          
        </>
      )}
      {userRole === 'instructor' && (
        <>
         {/*Button to instructor to see their classes */}
          <Link href="/my-classes" passHref>
            <Button>My Classes</Button> 
          </Link>

          <Link href="../../instructor/assigments" passHref>
            <Button>Add Assigments</Button>
          </Link>

          {/*} Button to instructor update grades by class*/}
          <Link href="/update-grades" passHref>
            <Button>Update Grades</Button>
          </Link>
        </>
      )}
      {userRole === 'admin' && (
  <>
    <Link href="../../sections/create" passHref>
      <Button>Create Class</Button>
    </Link>
    <Link href="../../sections/view" passHref>
      <Button>View Class Section</Button>
    </Link>
    <Link href="/users/create" passHref>
      <Button>Create User</Button>
    </Link>
    <Link href="../../admin/user-management" passHref>
      <Button>Manage Users</Button>
    </Link>
  </>
)}
      {(!userRole || userRole === 'none') && (
        <>
          <SignedOut>
            <Link href="/" passHref>
              <Button>Some College</Button>
            </Link>
          </SignedOut>
          <Link href="/info" passHref>
            <Button>Info</Button>
          </Link>
        </>
      )}
    </nav>
      
    </header>
  )
}

export default Header