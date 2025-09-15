"use client"

import * as React from "react"
import {Submission} from '@/types/index';
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ColumnDef
} from "@tanstack/react-table"
import { Loader, MoreHorizontal  , Trash} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const columns: ColumnDef<Submission>[] = [
  
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "supplier",
    header: "Nom Fournisseur",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("supplier")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email Fournisseur",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "productId",
    header: "Produit",
    cell: ({ row }) => <div className="lowercase">{row.getValue("productId")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantite",
    cell: ({ row }) => <div className="lowercase">{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "origin",
    header: "Origine",
    cell: ({ row }) => <div className="lowercase">{row.getValue("origin")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Montant</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const dossier = row.original
      const [open, setOpen] = useState(false)
      const [loader, setLoader] = useState(false)
      const handleDelete = async (dossierReference : string) => {
        setLoader(true);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log("delete " , dossierReference);
        setLoader(false);
        setOpen(false)
      }
      const router = useRouter();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only"></span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" >
            <DropdownMenuLabel className="cursor-pointer" onClick={() => router.push(`/my-space/${dossier.id}`)}>Voir les details</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(dossier.id)}
            >
              Copier le reference
            </DropdownMenuItem>
            <DropdownMenuSeparator /> 
            {/* <DropdownMenuItem className="text-[#e11d48]"> */}
              <AlertDialog open={open}>
                <AlertDialogTrigger className="text-[#e11d48] cursor-pointer mx-2 text-sm" onClick={() => setOpen(true)}>
                  Supprimer
                </AlertDialogTrigger> 
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle  className="flex flex-col items-center  justify-center">
                      <Trash className="mr-2 h-20 w-20 text-[#e11d48] " />
                      {""}
                      Êtes-vous absolument sûr ?
                      </AlertDialogTitle>
                    <AlertDialogDescription>
                    Cette action est irréversible. 
                    Elle supprimera définitivement votre dossier  de nos serveurs.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-[#e11d48] cursor-pointer" onClick={() => handleDelete(dossier.id)}>
                      {
                        loader ?
                        <Loader/>
                        : "Supprime"
                      }
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]