import React, { useState } from 'react'

export interface MenuItem {
  id: string
  text: string
  path: string
  Icon: React.FC
}

export function useNavigation(initialMenuItems?: MenuItem[]): [MenuItem[], React.Dispatch<MenuItem[]>] {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems || [])

  return [menuItems, setMenuItems]
}
