
import React from "react"
import ContentLoader from "react-content-loader"
import './ItemPage.scss'
const MyLoader = (props) => (
   <ContentLoader className="itemPageSkeleton"
      speed={0}
      width={100}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
   >
      <rect  x="188" y="228" rx="0" ry="0" width="20" height="0" />
      <rect x="279" y="411" rx="8" ry="8" width="110" height="45" />
      <rect x="0" y="265" rx="5" ry="5" width="400" height="44" />
      <rect x="11" y="423" rx="5" ry="5" width="115" height="27" />
      <rect x="-1" y="322" rx="8" ry="8" width="400" height="82" />
      <circle cx="47" cy="161" r="2" />
      <circle cx="79" cy="202" r="2" />
      <circle cx="242" cy="169" r="2" />
      <circle cx="201" cy="124" r="115" />
   </ContentLoader>
)

export default MyLoader

