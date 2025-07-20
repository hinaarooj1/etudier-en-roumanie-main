import {  getAuthToken, verifyToken } from "@/lib/auth";
import { hashPassword,comparePassword } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(request) {
    try {
        const token = getAuthToken(request);
        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401
            });
        }

        const decoded = verifyToken(token);
        if (!decoded?.id) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), {
                status: 401
            });
        }

        const { currentPassword, newPassword } = await request.json();

        // Validate input
        if (!currentPassword || !newPassword) {
            return new Response(JSON.stringify({ error: 'Current and new password are required' }), {
                status: 400
            });
        }

        // Get user with current password hash
        const user = await prisma.customer.findUnique({
            where: { id: decoded.id },
            select: { password: true }
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404
            });
        }

        // Verify current password (you'll need to implement comparePassword)
        const isPasswordValid = await comparePassword(currentPassword, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: 'Current password is incorrect' }), {
                status: 400
            });
        }

        // Hash new password
        const hashedPassword = await hashPassword(newPassword);

        // Update password
        await prisma.customer.update({
            where: { id: decoded.id },
            data: { password: hashedPassword }
        });

        return new Response(JSON.stringify({ message: 'Password updated successfully' }), {
            status: 200
        });

    } catch (error) {
        console.error('Password update error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500
        });
    }
}