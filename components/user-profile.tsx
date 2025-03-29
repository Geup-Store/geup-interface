"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Camera, Edit, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    memberSince: "March 2023",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // In a real app, you would save the data to the backend here
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileData.avatar} alt={profileData.name} />
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8">
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Change profile picture</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change profile picture</DialogTitle>
                  <DialogDescription>Upload a new profile picture or choose from the options below.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center justify-center">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={profileData.avatar} alt={profileData.name} />
                      <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <button key={i} className="relative aspect-square overflow-hidden rounded-md border">
                        <Image
                          src={`/placeholder.svg?height=60&width=60&text=Avatar${i}`}
                          alt={`Avatar option ${i}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input id="picture" type="file" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            ) : (
              <>
                <p className="text-muted-foreground">{profileData.email}</p>
                <p className="text-muted-foreground">{profileData.phone}</p>
                <p className="text-sm">Member since {profileData.memberSince}</p>
              </>
            )}
          </div>

          <Button variant="outline" size="sm" className="ml-auto hidden md:flex">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

