import { FaPen } from "react-icons/fa6";
import { MdOutlineTextFields } from "react-icons/md";
import { LuSlash } from "react-icons/lu";
import { TbRotateRectangle, TbHandClick } from "react-icons/tb";
import { IoEllipseSharp } from "react-icons/io5";
import { GrSelect } from "react-icons/gr";
import { GiLaserBlast } from "react-icons/gi";
import { PiEraserFill } from "react-icons/pi";
import { ZegoSuperBoardManager } from "zego-superboard-web";

const tools = [
  { name: "Pen", icon: FaPen, type: 1 },
  { name: "Text", icon: MdOutlineTextFields, type: 2 },
  { name: "Line", icon: LuSlash, type: 4 },
  { name: "Rectangle", icon: TbRotateRectangle, type: 8 },
  { name: "Ellipse", icon: IoEllipseSharp, type: 16 },
  { name: "Select", icon: GrSelect, type: 32 },
  { name: "Eraser", icon: PiEraserFill, type: 64 },
  { name: "Laser", icon: GiLaserBlast, type: 128 },
  { name: "Click", icon: TbHandClick, type: 256 },
];

function Tools({ disabled }) {
  const handleTool = (type) => {
    if (disabled) return;
    try {
      ZegoSuperBoardManager.getInstance().setToolType(type);
    } catch (err) {
      console.error("Tool change failed:", err);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 w-40 h-full overflow-y-auto">
      {tools.map(({ name, icon: Icon, type }) => (
        <div
          key={type}
          onClick={() => handleTool(type)}
          className={`p-2 flex items-center ${
            disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-gray-600"
          }`}
        >
          <Icon />
          <span className="ml-2">{name}</span>
        </div>
      ))}
    </div>
  );
}

export default Tools;