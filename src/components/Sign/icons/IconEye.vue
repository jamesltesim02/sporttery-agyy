<template>

  <svg
    v-if="opened"
    width=".20rem"
    height=".15rem"
    viewBox="0 0 20 15"
  >
    <g
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
      opacity="0.600000024"
    >
      <g
        transform="translate(-342.000000, -349.000000)"
        fill="#FFFFFF"
        fill-rule="nonzero"
      >
        <g transform="translate(30.000000, 278.000000)">
          <g transform="translate(312.000000, 71.000000)">
            <path d="M10,0 C5.64660877,0 1.87105001,3.04516206 0,7.50003752 C1.87105001,11.9548129 5.64662873,15 10,15 C14.3533713,15 18.12895,11.9548379 20,7.50003752 C18.12895,3.04516206 14.3533712,0 10,0 Z M10,12.5165122 C7.75035078,12.5165122 5.92671062,10.2705405 5.92671062,7.50003754 C5.92671062,4.72945958 7.75037078,2.4834878 10,2.4834878 C12.2495893,2.4834878 14.0732494,4.72945958 14.0732494,7.50003754 C14.0732294,10.2705155 12.2495893,12.5165122 10,12.5165122 Z"/>
          </g>
        </g>
      </g>
    </g>
  </svg>
  <svg
    v-else
    width=".2rem"
    height=".18rem"
    viewBox="0 0 20 18"
  >
    <g
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
      opacity="0.600000024"
    >
      <g
        transform="translate(-342.000000, -347.000000)"
        fill="#FFFFFF"
        fill-rule="nonzero"
      >
        <g transform="translate(30.000000, 278.000000)">
          <g transform="translate(312.000000, 69.000000)">
            <path d="M7.9,16.9714286 L9.7,14.6571428 L9.89999999,14.6571428 C13.3,14.6571428 15.8,12.9857143 17.7,9.51428572 C17.1,8.48571431 16.4,7.5857143 15.7,6.81428573 L17.2,5.14285715 C18.3,6.3 19.2,7.84285714 20,9.51428572 C17.7,14.6571429 14.3,17.1 10,17.1 C9.29999999,17.2285714 8.60000001,17.1 7.9,16.9714286 Z M2.30000001,13.3714286 C1.50000002,12.3428572 0.700000007,11.0571429 0,9.51428572 C2.29999999,4.37142858 5.7,1.92857146 10,1.92857143 L11.1,1.92857143 L9.1,4.50000002 C6.1,4.75714286 3.80000001,6.42857144 2.1,9.51428572 C2.50000001,10.2857143 3,11.0571429 3.50000001,11.5714286 L2.30000001,13.3714286 Z M15.7,-5.68434189e-14 L17.1,1.80000002 L4.5,18 L3.10000001,16.2 L15.7,-5.68434189e-14 Z" />
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    opened: {
      default: false,
      type: Boolean,
    },
  },
};
</script>
