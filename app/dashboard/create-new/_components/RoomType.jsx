"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select"
function RoomType({ selectedRoomType }) {
  return (
    <div className="mt-5">
      <label className="text-slate-400">Select Room Type *</label>

      <Select onValueChange={(value) => selectedRoomType(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Room Type" />
        </SelectTrigger>



        <SelectContent>
          <SelectGroup>         <SelectItem value="Living Room">Living Room</SelectItem>
          <SelectItem value="Bedroom">Bedroom</SelectItem>
          <SelectItem value="Kitchen">Kitchen</SelectItem>
          <SelectItem value="Office">Office</SelectItem>
          <SelectItem value="Bathroom">Bathroom</SelectItem>
          </SelectGroup>
 
        </SelectContent>
      </Select>
    </div>
  );
}

export default RoomType;
