import './colrewrite.module.scss'
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

const ColRewrite = ({
	children,
	xs,
	sm,
	md,
	lg,
	textAlign = "left",
	marginBottom,
	flexDirection = "column",
	justifyContent = "flex-start",
	alignItems = "flex-start",
	ratio,
	allowScroll,
}) => {
	let colClasses = cx({
		col: true,
		[`col-sm-${xs}`]: xs,
		[`col-sm-${sm}`]: sm,
		[`col-md-${md}`]: md,
		[`col-lg-${lg}`]: lg,
		[`text-align-${textAlign}`]: textAlign,
		[`flex-direction-${flexDirection}`]: flexDirection,
		[`justify-content-${justifyContent}`]: justifyContent,
		[`align-items-${alignItems}`]: alignItems,
		[`ratio-${ratio}`]: ratio,
		[`margin-bottom-${marginBottom}`]: marginBottom,
		allowScroll : allowScroll,
		})
	return (
		<div>

		</div>
	)
}
export default ColRewrite;