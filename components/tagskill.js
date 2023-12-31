import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import Swal from "sweetalert2"
import { useSelector, useDispatch } from "react-redux"
import { addAuth } from "@/store/reducers/authSlice"

function Tagskill(props) {
  const { skillName, index } = props
  const state = useSelector((state) => state)
  const router = useRouter()
  const dispatch = useDispatch()
  const [userData, setUserData] = React.useState("")

  const handleDeleteSkill = () => {
    axios
      .delete(`https://hire-job.onrender.com/v1/skills/${index}`)
      .then(() => {
        Swal.fire({
          title: "Delete Skills Success!",
          text: "Delete Skills Success!",
          icon: "success",
        })
        axios
          .get("https://hire-job.onrender.com/v1/profile")
          .then((response) => {
            const newData = response?.data?.data
            const token = state?.authSlice?.token
            dispatch(addAuth({ user: newData, token }))
            setUserData(newData)
          })
      })
      .catch((error) => {
        let text = "Kesalahan Pada Aplikasi Kami!"
        const errors = error?.response?.data?.messages
        if (Object.keys(errors).length != 0) {
          text = ""
          for (const key in errors) {
            text += `${key}: ${errors[key].message} \n`
          }
        }
        Swal.fire({
          title: "Error!",
          text: text,
          icon: "error",
        })
      })
  }

  return (
    <>
      <Link
        className="btn btn-outline-warning text-white m-1 fw-semibold"
        href="#"
        style={{ backgroundColor: "rgba(251, 176, 23, 0.6)" }}
      >
        {skillName}{" "}
        {router.pathname == "/editprofile" ? (
          <button
            class="btn-close p-0 m-0"
            onClick={handleDeleteSkill}
          ></button>
        ) : (
          ""
        )}
      </Link>
    </>
  )
}

export default Tagskill
