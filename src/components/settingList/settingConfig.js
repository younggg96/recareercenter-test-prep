import { ExamDayIcon, ForwardIcon, MemberIcon, PersonIcon, ReviewIcon, ShopIcon, LockIcon, AboutUsIcon, BellIcon, ShareIcon, ContactUsIcon, BookIcon, GiftIcon, ShareNormalIcon } from "../icons/icons";

export const profileSettings = [
  { title: "Study Plan", icon: ExamDayIcon, rightIcon: ForwardIcon, link: "StudyPlanScreen", disable: false },
  { title: "Review Questions", icon: ReviewIcon, rightIcon: ForwardIcon, link: "ReviewsScreen", disable: false },
  { title: "Manage Your Membership", icon: MemberIcon, rightIcon: ForwardIcon, link: "MembershipScreen", disable: false },
];

export const viewOurWebsite = [
  { title: "Visit Our Online Store", icon: ShopIcon, rightIcon: ForwardIcon, disable: false, url: "https://www.recareercenter.com"},
  { title: "Shop at Our Book Store", icon: BookIcon, rightIcon: ForwardIcon, disable: false, url: "https://www.recareercenter.com/product-category/books/" },
  { title: "Check Out Our Merch Store", icon: GiftIcon, rightIcon: ForwardIcon, disable: false, url: "https://www.recareercenter.com/product-category/merch-store/" },
];

export const settings = [
  // { title: "Change Password", icon: LockIcon, rightIcon: ForwardIcon, link: 'ChangePasswordScreen', disable: false},
  { title: "Notification", icon: BellIcon, rightIcon: ForwardIcon, link: 'NotificationScreen', disable: false},
  { title: "About Us", icon: AboutUsIcon, rightIcon: ForwardIcon, link: 'AboutUsScreen', disable: false},
  // { title: "Contact Us", icon: ContactUsIcon, rightIcon: null, link: null, disable: false},
  { title: "Share Our App", icon: ShareNormalIcon, rightIcon: null, link: null, disable: false},
]