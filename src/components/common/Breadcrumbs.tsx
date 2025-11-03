import Link from "next/link"

const Breadcrumbs = ({ page, style }: any) => {
    return (
        <div className="breadcrumb-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-content">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                    <li className={`breadcrumb-item ${style?"":"active"}`} aria-current="page">{page}</li>
                                    {style && <li className="breadcrumb-item active" aria-current="page">Smashing Podcast Episode 58 With Debbie What Is CX Design?</li>}
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumbs
