import React from 'react';
import { 
  Plane, Receipt, ShoppingCart, GraduationCap, 
  Coffee, Calculator, Smartphone, Heart, ShoppingBag, 
  MoreHorizontal, Plus 
} from 'lucide-react';

const icons = {
  travel: Plane,
  bills: Receipt,
  groceries: ShoppingCart,
  education: GraduationCap,
  leisure: Coffee,
  emi: Calculator,
  mobile: Smartphone,
  health: Heart,
  shopping: ShoppingBag,
  misc: MoreHorizontal,
  new: Plus
};

const CategoryIcon = ({ category, size = 24 }) => {
  const Icon = icons[category] || MoreHorizontal;
  return <Icon size={size} />;
};

export default CategoryIcon;