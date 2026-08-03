import CountUp from "react-countup";

function AnimatedCounter({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  separator = ",",
  decimals = 0,
  className = "",
}) {
  return (
    <CountUp
      end={Number(value)}
      duration={duration}
      separator={separator}
      decimals={decimals}
      prefix={prefix}
      suffix={suffix}
    >
      {({ countUpRef }) => (
        <span
          ref={countUpRef}
          className={className}
        />
      )}
    </CountUp>
  );
}

export default AnimatedCounter;