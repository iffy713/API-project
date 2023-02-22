import './Footer.css'

export default function Footer(){
    const date = new Date()
    const currentYear = date.getFullYear()

    return (
        <div id="footer-ctn-outer">
            <div id="footer-ctn">
                <div>
                    &copy; {currentYear} Airbvb
                </div>
                <div>
                    Developed by <span id='portfolio-link-ctn'>
                            <a href='https://iffy713.github.io/' target="_blank">
                                Yifan Xin
                            </a>
                        </span>
                </div>
                <div id='contact-icon-ctn'>
                    <a href={'https://github.com/iffy713/Nstorm'} target="_blank">
                        <i class="fa-brands fa-square-github"></i>
                    </a>
                    <a href='https://www.linkedin.com/in/yifan-xin/' target='_blank'>
                        <i class="fa-brands fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}
