import  "./SectionHeading.css"

const Sectionheading=({text})=>{
    return(
        <div className="section-heading">
            <h2 className="headname"><span className="headline">{text}</span></h2>
        </div>
    )
}


export default Sectionheading;