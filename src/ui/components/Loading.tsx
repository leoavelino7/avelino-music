const Loading: React.FC = () => (
  <div className="bg-black h-screen flex flex-col text-center justify-center items-center">
    <svg
      className="text-white h-5 w-5 mr-3"
      version="1.1"
      id="L2"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 100 100"
    >
      <circle fill="none" stroke="#fff" strokeWidth="4" strokeMiterlimit="10" cx="50" cy="50" r="48" />
      <line fill="none" strokeLinecap="round" stroke="#fff" strokeWidth="4" strokeMiterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
        <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite" />
      </line>
      <line fill="none" strokeLinecap="round" stroke="#fff" strokeWidth="4" strokeMiterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
        <animateTransform attributeName="transform" dur="15s" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite" />
      </line>
    </svg>
    <span className="text-white text:sm md:text-xl font-light mt-2">Aguarde só um momento, está quase pronto...</span>
  </div>
)

export default Loading
